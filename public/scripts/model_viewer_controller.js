$() {
   $('#edit_btn').click(() => {
      let editableInputs = $('.editable');
      
      if (editableInputs) {
         editableInputs.removeAttr('readonly')
                       .removeClass('form-control-plaintext editable')
                       .addClass('form-control');
         $('#save_edit').show("slow");
         $(this).hide("slow");
      }      
   });
   
}