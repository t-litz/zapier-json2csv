const { Parser } = require('json2csv');

const perform = async (z, bundle) => {
  let json = JSON.parse(bundle.inputData.json);
  let fileName = bundle.inputData.file_name ? bundle.inputData.file_name : "new_csv.csv";

  if (!fileName.includes(".csv")) {
    fileName += '.csv'
  }

  const json2csvParser = new Parser();
  const csv_text = json2csvParser.parse(json);
  let stream = new Buffer(csv_text);
  const url = await z.stashFile(stream, stream.length, fileName, 'text/csv');

  return {
    csv_text: csv_text,
    file: url,
    name: fileName
  }
};

module.exports = {
  key: 'json_2_csv',
  noun: 'CSV File',

  display: {
    label: 'JSON to CSV',
    description: 'Creates a new csv file from JSON Text String'
  },

  operation: {
    perform,
    inputFields: [
      { key: 'json', label: "JSON Text String", type: "text", required: true },
      { key: 'file_name', label: 'File Name', required: false, helpText: "The name of the file. Default is 'new_csv.csv'" }
    ],

    sample: {
      csv_text: 'some csv text',
      file: 'some file',
      name: 'some_name.csv'
    },
  }
};
