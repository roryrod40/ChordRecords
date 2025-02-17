import boto3
import os
from dotenv import load_dotenv

load_dotenv()

# Use local DynamoDB endpoint
DYNAMODB_ENDPOINT = os.getenv("DYNAMODB_ENDPOINT")

# Fake credentials for local DynamoDB
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")

# Initialize DynamoDB Client
dynamodb = boto3.resource(
    "dynamodb",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    endpoint_url=DYNAMODB_ENDPOINT,
)

# Create (or reference) the table
TABLE_NAME = "Songs"
songs_table = dynamodb.Table(TABLE_NAME)

# Create table if it doesn’t exist
def create_table():
    existing_tables = boto3.client(
        "dynamodb",
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        endpoint_url=DYNAMODB_ENDPOINT,
    ).list_tables()["TableNames"]

    if TABLE_NAME not in existing_tables:
        dynamodb.create_table(
            TableName=TABLE_NAME,
            KeySchema=[{"AttributeName": "song_id", "KeyType": "HASH"}],
            AttributeDefinitions=[{"AttributeName": "song_id", "AttributeType": "S"}],
            ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
        )
        print(f"Table {TABLE_NAME} created!")

# Run the table creation function at startup
create_table()
