import os
# Set env vars before any application code is imported.
os.environ['DB_NAME'] = 'test_db_status_checks'
os.environ['MONGO_URL'] = 'mongodb://mock_host:27017'

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
import asyncio
from datetime import datetime, timezone

from mongomock_motor import AsyncMongoMockClient

# Import the application and the dependency function we want to override
from backend.server import app, get_db

# Create a mock client and database instance for testing
mock_client = AsyncMongoMockClient()
mock_db = mock_client[os.environ['DB_NAME']]

# This is our override function. It will replace the real `get_db`
# in the application when tests are run.
async def get_test_db():
    yield mock_db

# Apply the dependency override to the FastAPI app.
# This tells the app to use `get_test_db` whenever `get_db` is requested.
app.dependency_overrides[get_db] = get_test_db

@pytest_asyncio.fixture(scope="function", autouse=True)
async def setup_and_teardown_db():
    """
    This fixture automatically cleans up the mock database before and after each test.
    It uses the global `mock_client` and `mock_db` instances.
    """
    await mock_client.drop_database(mock_db.name)
    yield
    await mock_client.drop_database(mock_db.name)

@pytest.mark.asyncio
async def test_get_status_checks_is_sorted():
    """
    This test verifies that the `/api/status` GET endpoint returns status checks
    sorted by timestamp in descending order. It also confirms that the refactoring
    to address deprecation warnings did not introduce regressions.
    """
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Create the first status check
        post_response_1 = await ac.post("/api/status", json={"client_name": "client-1"})
        assert post_response_1.status_code == 200

        # Pause to ensure a different timestamp
        await asyncio.sleep(0.01)

        # Create the second status check
        post_response_2 = await ac.post("/api/status", json={"client_name": "client-2"})
        assert post_response_2.status_code == 200

        # Retrieve the list of status checks
        get_response = await ac.get("/api/status")
        assert get_response.status_code == 200
        status_checks = get_response.json()

        # Verify that two checks were created
        assert len(status_checks) == 2

        # Extract timestamps. The format from `model_dump` will be a string.
        # `fromisoformat` correctly handles the timezone info.
        timestamps = [datetime.fromisoformat(check['timestamp']) for check in status_checks]

        # Assert that the timestamps are in descending order
        assert timestamps == sorted(timestamps, reverse=True), "The status checks are not sorted by timestamp in descending order."