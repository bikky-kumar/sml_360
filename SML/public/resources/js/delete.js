//Working Perfectly

//delete request customer
$(document).ready(function(){
    $('.delete-customer').on('click', function(){
        $id = $(this).attr("data-id");
        if (confirm("warning: Deleting Customer Data?")) {
            // do delete; use var id to delete data
            $.ajax({
                type:'DELETE', 
                url: `http://localhost:4000/pms/customer/delete/`+$id,
                success: function(response){
                    window.location.href='/app/customers';
                },
                error: function(err){
                    console.log(err);
                }
            })
        }
    });
});


$(document).ready(function(){
    $('.delete-staff').on('click', function(){
        $id = $(this).attr("data-id");
        if (confirm("warning: Deleting Staff Data?"+$id)) {
            // do delete; use var id to delete data
            $.ajax({
                type:'DELETE', 
                url: `http://localhost:4000/pms/staff/delete/`+ $id,
                success: function(response){
                    window.location.href='/app/staff';
                },
                error: function(err){
                    console.log(err);
                }
            })
        }
    });
});
