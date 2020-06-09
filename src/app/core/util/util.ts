import Swal from 'sweetalert2';

export class MessageUtil {
  public static loading() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando',
      heightAuto: false
    });
    Swal.showLoading();
  }

  public static close() {
    Swal.close();
  }

  public static success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Operación completada',
      text: message,
      heightAuto: false
    });
  }

  public static error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      heightAuto: false,
    });
  }

  public static info(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Aviso',
      text: message,
      heightAuto: false
    });
  }

  public static warning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Aviso',
      text: message,
      heightAuto: false
    });
  }

  public static deleteOption() {
    return Swal.fire({
      title: 'Estás seguro?',
      text: 'Esta acción es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
  }
}
