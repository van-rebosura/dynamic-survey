// constants
const STATEMENT_TAG = 'p';
const ERROR_TAG = 'span';

document.querySelector('#addButton').addEventListener('click', addTable);

function addField() {
  // <td>
  let parentNode = this.parentNode;
  // input[type='text']
  let newField = parentNode.children[0].value;
  // goes from <td>, to <tr>, to <table>
  let table = parentNode.parentNode.parentNode;
  if (newField) {
    // add text to current statements
    hideError(parentNode);
    let statementTag = createStatement(newField);
    // create new table row <tr>
    const tr = createTableRow(statementTag);
    // append <tr> to <table>
    table.appendChild(tr);
    // add radio buttons
    initRadioButtons(tr);
  } else {
    showError(parentNode);
  }
}

// identifies the tables
let count = 0;

function addTable() {
  const title = document.querySelector('#tableName').value;
  if (!title) {
    console.log('required');
    let span = document.querySelector('span.warning');
    span.classList.remove('hidden');
    console.log(span);
    return;
  }
  document.querySelector('span.warning').classList.add('hidden');
  console.log(`invoked!: ${count}`);
  // init
  const container = document.querySelector('#container');
  // table
  const table = document.createElement('table');
  table.id = `table${count++}`;
  // tr
  const tableRow = document.createElement('tr');
  // th
  const tableHeader = document.createElement('th');
  const tableHeader1 = tableHeader.cloneNode();
  tableHeader.classList.add('table-title');
  tableHeader.colSpan = '6';
  // title
  const textNode = document.createTextNode(title);

  // append headers
  tableHeader.appendChild(textNode);
  tableRow.appendChild(tableHeader);

  const tableData = document.createElement('td');
  const tableRow1 = tableRow.cloneNode();

  const statementTh = tableData.cloneNode();
  statementTh.classList.add('center', 'fixed-length');
  const statementTextNode = document.createTextNode('statement');
  statementTh.appendChild(statementTextNode);

  tableRow1.appendChild(statementTh);

  for (let i = 0; i < 5;) {
    const th1 = tableData.cloneNode();
    th1.classList.add('center');
    const textNode1 = document.createTextNode(++i);
    th1.appendChild(textNode1);
    tableRow1.appendChild(th1);
  }

  const editText = document.createElement('input');
  editText.type = 'text';
  editText.classList.add('statement');

  // button row
  const addFieldButton = document.createElement('input');
  addFieldButton.type = 'button';
  addFieldButton.value = 'add new field';
  addFieldButton.classList.add('btn-new-field');
  const tableRow2 = tableRow.cloneNode();
  const tableData1 = document.createElement('td');

  // button action
  addFieldButton.addEventListener('click', addField);

  // append editText
  tableData1.appendChild(editText);

  // append button
  tableData1.appendChild(addFieldButton);

  // append error message
  initErrorTag('\nstatement is required', tableData1);

  tableRow2.appendChild(tableData1);

  // append all to table
  table.appendChild(tableRow);
  table.appendChild(tableRow1);
  table.appendChild(tableRow2);

  container.appendChild(table);

}

function initErrorTag(errorMessage, insertionPoint) {
  const textNode = document.createTextNode(errorMessage);
  const errorTag = document.createElement(ERROR_TAG);
  errorTag.appendChild(textNode);
  errorTag.classList.add('warning', 'hidden');
  insertionPoint.appendChild(errorTag);
}

function showError(insertionPoint) {
  insertionPoint.children[2].classList.remove('hidden');
}

function hideError(insertionPoint) {
  insertionPoint.children[2].classList.add('hidden');
}

function createStatement(statement) {
  const textNode = document.createTextNode(statement);
  const statementTag = document.createElement(STATEMENT_TAG);
  statementTag.appendChild(textNode);
  return statementTag;
}

function createTableRow(statementElement) {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.appendChild(statementElement);
  tr.appendChild(td);
  return tr;
}

function initRadioButtons(insertionPoint) {
  for (let i = 0; i < 5; i++) {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.value = i + 1;
    // TODO: current name is for testing only
    radio.name = 'test';
    const td = document.createElement('td');
    td.appendChild(radio);
    insertionPoint.appendChild(td);
  }
}
