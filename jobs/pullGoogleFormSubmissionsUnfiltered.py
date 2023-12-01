# Reference: https://developers.google.com/sheets/api/guides/concepts

# Import required dependencies.
from dotenv import load_dotenv
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import json, os, socket, time

# Load environment variables from .env.
load_dotenv()  

YEAR = str(os.getenv('AOC_YEAR'))
DIR_PATH = os.path.dirname(os.path.abspath(__file__))

IS_PRODUCTION = socket.gethostname() == 'mncomputerclub.com'

GOOGLE_TOKEN_FILENAME = 'google-service-account.json'
GOOGLE_TOKEN_FILEPATH = os.path.join(os.getenv('PATH_TO_GOOGLE_TOKEN') + str(YEAR) + '/', GOOGLE_TOKEN_FILENAME) if IS_PRODUCTION else os.path.abspath(os.path.join(DIR_PATH, GOOGLE_TOKEN_FILENAME))

GOOGLE_API_SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
GOOGLE_SPREADSHEET_ID = '1P6gUL4k4OkwHsIItXA04sQRef5oK-9sRn0sT--HHSiI'
GOOGLE_SPREADSHEET_RANGE = 'Form Responses 1'

EXCLUDED_COLUMNS = ['Your School Email Address']

OUTPUT_FILE_NAME = 'generatedGoogleFormSubmissions' + YEAR + 'Unfiltered.json'
OUTPUT_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'generatedData', OUTPUT_FILE_NAME))

def main():
  creds = None

  if os.path.exists(GOOGLE_TOKEN_FILEPATH):
    creds = Credentials.from_service_account_file(filename=GOOGLE_TOKEN_FILEPATH, scopes=GOOGLE_API_SCOPES)
  else:
    exit(1)

  try:
    service = build('sheets', 'v4', credentials=creds)

    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=GOOGLE_SPREADSHEET_ID, range=GOOGLE_SPREADSHEET_RANGE).execute()
    values = result.get('values', [])

    columns, rows = values[0], values[1:]

    competitors = {}
    excludedColumns = [columns.index(column) for column in EXCLUDED_COLUMNS]

    for row in rows:
      user = {}
      for i in range(len(columns)):
          if i not in excludedColumns:
              if (i >= len(row)): 
                user[columns[i]] = ''
              else:
                user[columns[i]] = row[i].strip()

      user["City"] = user["Your School"].split("|")[1].strip() if len(user["Your School"].split("|")) > 1 else ""
      user["Your School"] = user["Your School"].split("|")[0].strip() or ""

      competitors[user['Your AoC Username'].strip()] = user

    dataToWrite = {}
    dataToWrite['competitors'] = competitors
    dataToWrite['lastUpdatedAt'] = int(time.time())

    with open(OUTPUT_FILE_PATH, 'w', encoding='utf-8') as f:
      json.dump(dataToWrite, f, indent=2)

    exit(0)

  except Exception as e:
    exit(2)

if __name__ == '__main__':
  main()