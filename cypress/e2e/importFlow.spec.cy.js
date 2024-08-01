import confg from'./config/config'

function importCard(username, password, category,service_code,product,text, file){
  describe('Import Card in Warehouse', () => {
    beforeEach(() => {
      cy.visit('http://192.168.100.192:9631/Default.aspx');
      cy.get('#txtUserName').type(username);
      cy.get('#txtPassword').type(password);
      cy.get('input[name="btnLogin"]').click();
  
    })
    it('Import', () => {
      //Click ô Softpin
      cy.get('.sysSoftpin').click();
      //click Import Softpin Batch
      cy.get('.listAdministrator').contains('Import Softpin Batch').click();

      //insert data - type
      cy.get('select[name="ctl00$ContentPlaceHolder1$ddlInputFile"]').select('Normal file');
      cy.wait(1000);
      // insert data - category
      cy.get('select[name="ctl00$ContentPlaceHolder1$ddlCategory"]').select(category);

      //insert data - service code + product
      cy.get('select[name="ctl00$ContentPlaceHolder1$ddlServiceProvider"]').select(service_code);
      cy.get('select[name="ctl00$ContentPlaceHolder1$ddlProduct"]').select(product);

      //insert Text
      cy.get('input[name="ctl00$ContentPlaceHolder1$txtSourceOfCards"]').type(text);

      //choose file
      // cy.get('input[type=file]').selectFile('C:/Users/Admin/Documents/IMEDIA/Automation_Testing_API/AutoCreateFileSerial/${file}.csv')
      // Giả lập việc chọn file
cy.fixture(file).then(fileContent => {
  cy.get('input[type="file"]').then($input => {
    const blob = new Blob([fileContent], { type: 'text/csv' });
    const testFile = new File([blob], file, { type: 'text/csv' });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);

    $input[0].files = dataTransfer.files;
  });
});

// Commit
cy.get('.Button[type="submit"]').click();

cy.log('Import thẻ lên kho thành công')


  
    })
  })
};
function approveCard(username, password,product,count){
  describe('Import Card in Warehouse', () => {
    beforeEach(() => {
      cy.visit('http://192.168.100.192:9631/Default.aspx');
      cy.get('#txtUserName').type(username);
      cy.get('#txtPassword').type(password);
      cy.get('input[name="btnLogin"]').click();
  
    })
    it('Approve', () => {
      //Click ô Softpin
      cy.get('.sysSoftpin').click();
      //click Import Softpin Batch
      cy.get('.listAdministrator').contains('List Pending Import Make Entries').click();

      //approve Card
      cy.get('#ctl00_ContentPlaceHolder1_gridListPendingSoftpinBatches_ctl02_tdApprove').click();
      cy.wait(1000);
      

      // Click Approve button 
      cy.get('#ctl00_ContentPlaceHolder1_Button1').click();

    })

    it('Reservation', () => {
      //Click ô Softpin
      cy.get('.sysSoftpin').click();
      //click Softpin Reservation
      cy.get('#ctl00_LeftMenuController1_C0891').click();

      //choose product
      cy.get('select[name="ctl00$ContentPlaceHolder1$ddlProduct"]').select(product);
      cy.wait(1000);

      //insert data - number
      cy.get('#ctl00_ContentPlaceHolder1_txtNumberofSoftpintoReserve').type(count);
      

      // Click Approve button 
      cy.get('.Button[name="ctl00$ContentPlaceHolder1$btnReserve"]').click();


    })
    
    it('Search card', () => {
      //Click ô Softpin
      cy.get('.sysSoftpin').click();
      //click Softpin Reservation
      cy.get('.listAdministrator').contains('Softpin Reservation Summary').click();

      //find product
      cy.get('select[name="ctl00$ContentPlaceHolder1$ddlNumberList"]').select('50');
      cy.get('#ctl00_ContentPlaceHolder1_gridListSoftpinReservationSummary').find('tbody tr td').contains(product).should('be.visible');
      cy.log('Tìm thấy thẻ trên kho');

      

    })

  })
};
// importCard(confg.username, confg.password, confg.category,confg.service_code,confg.product,confg.text, confg.file);
approveCard(confg.user_approve,confg.pass_approve,confg.product,confg.count);
