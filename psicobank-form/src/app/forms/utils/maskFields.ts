export const maskCPFValue = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ''); // remove non-numeric characters
    
    return cleanedValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
}

export const maskCNPJValue = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ''); // remove non-numeric characters

    return cleanedValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
}