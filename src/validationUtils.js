export const validatePhoneNumber = (numberInput, language = "EN") => {
    // Check if the phone number is empty
    // Numara boş bırakılamaz
    if (!numberInput) {
      return { isValid: false, errors: [language === "TR" ? 'Telefon Numarası Boş Bırakılamaz!' : 'Phone number cannot be empty'] };
    }
  
    // Check for number format (integer or decimal)
    // Geçersiz karakter girilmesi durumunda yapılacak kontrol
    if (!/^\d*\.?\d*$/.test(numberInput)) {
      return { isValid: false, errors: [language === "TR" ? 'Geçersiz Karakter Kullanılamaz!' : 'Invalid number format'] };
    }
  
    // Check for number format (integer without decimal)
    // Nokta numaralarda da kullanıldığı için ayrı bir kontrol gerekiyor
    if (!/^\d+$/.test(numberInput)) {
      return { isValid: false, errors: [language === "TR" ? 'Geçersiz Karakter Kullanılamaz!' : 'Invalid number format'] };
    }
  
    // Special characters and letters
    // Özel Karakter Kontolü
    if (!/^[0-9.]+$/.test(numberInput)) {
      return { isValid: false, errors: [language === "TR" ? 'Özel Karakter Kullanılamaz!' : 'Special characters or letters are not allowed'] };
    }
  
    // Leading zeros
    // Sıfır ile Başlamamalı - Özel karakter kontolü olduğu için negatif sayılarda tekrar kontrol yapmaya gerek yok
    if (/^0\d/.test(numberInput)) {
      return { isValid: false, errors: [language === "TR" ? 'Numara Sıfır ile Başlayamaz!' : 'Leading zeros are not allowed'] };
    }
  
    // Whitespace
    // Boşluk Kontrolü
    if (numberInput.trim() !== numberInput) {
      return { isValid: false, errors: [language === "TR" ? 'Boşluk Kullanılamaz!' : 'Whitespace is not allowed'] };
    }
  
    // Check if the phone number has a valid length
    // Sadece 10 rakam girilmeli
    if (numberInput.length !== 10) {
      return { isValid: false, errors: [language === "TR" ? 'Numara 10 Rakamdan Oluşmalıdır!' : 'Phone number must be 10 digits'] };
    }
  
    // If all checks pass, return success
    // Uygunluk Kontrolü ve Hata Mesajı
    return { isValid: true, errors: [] };
  };