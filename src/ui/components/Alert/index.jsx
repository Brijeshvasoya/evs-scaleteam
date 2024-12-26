import Swal from 'sweetalert2'

const ConfirmationModal = (status,title,text,btntext,show) => {
   return Swal.fire({
        title: title,
        text: text,
        icon: status,
        showCancelButton: show,
        confirmButtonText: btntext,
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
}

export default ConfirmationModal
