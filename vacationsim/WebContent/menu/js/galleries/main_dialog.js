    $(function () {
      $("#dialog").dialog({
 	
        autoOpen: false,
        show: "fade",
        hide: "fade",
        modal: true,
        height: 'auto',
        width: 'auto',
        resizable: false,
        title: 'Welcome',
       /*  my: "center",
        at: "center",
        of: window, */
        //position: {my: "center",  at: "center", of: $("body"),within: $("body") },
        open: function (ev, ui) {
          $('#accordionIframe').src;
          $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
          
        },
        close: function (ev, ui) {
        	
          //$("#button-sim").parent().click();
         //window.parent.document.getElementById("button-sim").click();
         $("#button-sim", window.parent.document).click();
         $("#button-sim", window.parent.document).click();

         // wait(500);

         $("#menu_items", window.parent.document).show();

         $("#btn-prev", window.parent.document).show();
         $("#btn-edit", window.parent.document).show();
         $("#btn-next", window.parent.document).show();
         
		window.parent.document.getElementById("gallery_name").innerHTML=jsUcfirst(window.sessionStorage.getItem("currentGalleries"));

        },
        beforeClose: function closeDialog() {
      
        }
      });

      $("#opener").click(function () {
        $("#dialog").dialog("open");
        return false;
      });
    });
    
   