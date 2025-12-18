import Toast from 'react-native-toast-message';

export function showErrorToast(message: string) {
  Toast.show({
    type: 'error',
    text1: 'Erro',
    text2: message,
    position: 'bottom',
  });
}

export function showSuccessToast(message: string) {
  Toast.show({
    type: 'success',
    text1: 'Sucesso',
    text2: message,
    position: 'bottom',
  });
}