﻿
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function addActionsPatients() {

    $('#btnAddPatient').click(function () {
        var url = $('#ModalPatientAddOrEdit').data('url')
        $.get(url, function (data) {
            $("#ModalPatientAddOrEdit").html(data)
            $("#ModalPatientAddOrEdit").modal('show')
        });
    });

    $('.details-patient').click(function () {
        var url = $('#ModalPatientAddOrEdit').data('url') + '/' + $(this).data("id")
        $.get(url, function (data) {
            $("#ModalPatientAddOrEdit").html(data)
            $("#ModalPatientAddOrEdit").modal('show')
        });
    });

    //$('.remove-patient').click(function () {
    //    Swal.fire({
    //        title: 'Esta Seguro de eliminar al paciente?',
    //        text: "No podr\u00E1 revertir la acci\u00F3n!",
    //        type: 'warning',
    //        showCancelButton: true,
    //        confirmButtonColor: '#3085d6',
    //        cancelButtonColor: '#d33',
    //        confirmButtonText: 'S\u00ED, Eliminar!',
    //        cancelButtonText: 'Cancelar'
    //    }).then((result) => {
    //        if (result.value) {
    //            var url = $('#hddUrlRemovePatient').val()
    //            var posting = $.post(url, { id: $(this).data("id") });
    //            posting.done(function (data) {                    
    //                getAllPatients()                            
    //                    let notifier = new Notifier();
    //                    notifier.success('Paciente eliminado satisfactoriamente.','Paciente Eliminado!');
    //                });
    //        }
    //    })
    //});
}

function getAllPatients() {

    $.ajax({
        type: "POST",
        url: "../Patient/GetAll",
        success: function (data) {

            //$("#tbPatientBody").empty()
            $('#dataTable').DataTable().clear();
            $('#dataTable').DataTable().destroy();

            $.each(data, function (i, item) {
                let birthDate = new Date(parseInt(item.BirthDate.replace("/Date(", "").replace(")/", ""), 10))
                let createdDate = new Date(parseInt(item.CreatedDate.replace("/Date(", "").replace(")/", ""), 10))
                let formattedBirthDate = birthDate.getFullYear() + "-" + pad((birthDate.getMonth() + 1), 2) + "-" + pad(birthDate.getDate(), 2) + " "
                let formattedCreatedDate = createdDate.getFullYear() + "-" + pad((createdDate.getMonth() + 1), 2) + "-" + pad(createdDate.getDate(), 2) + " " + pad(createdDate.getHours(), 2) + ":" + pad(createdDate.getMinutes(), 2) + ":" + pad(createdDate.getSeconds(), 2)

                $("#tbPatientBody").append(`<tr><td style='text-align:center'> ${item.Document} </td><td style='text-align:center'> ${((item.Gender == 'M') ? '<i class="fas fa-mars fa-2x text-primary"></i>' : '<i class="fas fa-2x fa-venus text-danger"></i>')} </td><td> ${item.LastName + ' ' + item.FirstName} </td><td> ${formattedBirthDate} </td><td> ${formattedCreatedDate} </td><td> <button title="Editar" data-id="${item.Id}" class="btn btn-warning mb-2 mr-2 details-patient"> <i class="fas fa-user-edit"></i></button><button title="Detalle" data-id="${item.Id}" class="btn btn-success mb-2 mr-2 details-patient"> <i class="fas fa-history"></i></button></td></tr>`)

            })

            addActionsPatients()

            $('#dataTable').DataTable({
                order: [[4, 'desc']],
                language: {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Último",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            })
        }
    });
}



$(document).ready(function () {

    getAllPatients()

    addActionsPatients()

});

