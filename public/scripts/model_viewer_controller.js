$() {
   $('#edit_btn').click(() => {
      $('.editable').removeAttr('readonly')
                    .removeClass('form-control-plaintext editable')
                    .addClass('form-control');
      $('#save_edit').show("slow");
      $(this).hide("slow");      
   });   
}