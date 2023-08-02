const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener("click", handlerButtonClick);

//fungsi mengambil value button
function handlerButtonClick(e) {
  if (e.target.tagName === "INPUT") {
    const buttonValue = e.target.value;

    // kode untuk menampilkan nomor ke display
    const displayConverter = document.getElementById("display-number");
    let displayRoman = document.getElementById("display-roman");
    const displayConverterValue = displayConverter.textContent;

    try {
      // kondisi untuk menghapus value
      if (buttonValue === "c") {
        displayConverter.textContent = "";
        displayRoman.textContent = "";
      }
      //   kondisi jika button yang di klik valuenya bukan ""
      if (buttonValue !== "=" && buttonValue !== "c") {
        displayConverter.textContent += buttonValue;
      }
      // kondisi untuk menampilkan hasil
      if (buttonValue === "=") {
        intToRoman(displayConverterValue);
      }
    } catch (error) {
      // tampat untuukk menampilkan error
      displayRoman.textContent = error;
      console.info(error);
    }
  }
}

// Fungsi untuk mengkonversi integer menjadi angka Romawi
function intToRoman(integer) {
  // Data angka Romawi
  const romanNumerals = [
    { value: 1000000, numeral: "M\u0305" },
    { value: 500000, numeral: "D\u0305" },
    { value: 100000, numeral: "C\u0305" },
    { value: 50000, numeral: "L\u0305" },
    { value: 10000, numeral: "X\u0305" },
    { value: 5000, numeral: "V\u0305" },
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  const displayRoman = document.getElementById("display-roman");
  let result = "";
  const bucket = []; // Array untuk menyimpan karakter-karakter Romawi

  // Iterasi melalui data angka Romawi untuk mengkonversi integer ke angka Romawi
  for (const romanData of romanNumerals) {
    while (integer >= romanData.value) {
      // Tambahkan karakter Romawi ke array bucket dan result
      bucket.push(romanData.numeral);
      result += romanData.numeral;
      // Kurangi integer dengan nilai angka Romawi yang telah dikonversi
      integer -= romanData.value;
    }
  }

  // Memisahkan karakter-karakter ke dalam array withOverline dan withoutOverline
  const { withOverline, withoutOverline } = bucket.reduce(
    (acc, char) => {
      // Cek apakah karakter memiliki garis atas (Unicode \u0305)
      if (char.includes("\u0305")) {
        acc.withOverline.push(char);
      } else {
        acc.withoutOverline.push(char);
      }
      return acc;
    },
    { withOverline: [], withoutOverline: [] }
  );

  // jalankan fungsi tes duplikat
  checkDuplicateCharacters(withOverline);
  checkDuplicateCharacters1(withoutOverline);

  // Menampilkan hasil konversi ke dalam elemen dengan id "display-roman"
  return (displayRoman.textContent += result);
}

function checkDuplicateCharacters(str) {
  const charCount = {}; // Objek untuk menyimpan jumlah kemunculan karakter

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1; // Hitung jumlah kemunculan karakter

    if (charCount[char] > 3) {
      throw new Error(`Karakter '${char}' muncul lebih dari 3 kali.`);
    }
  }
}
function checkDuplicateCharacters1(str) {
  const charCount = {}; // Objek untuk menyimpan jumlah kemunculan karakter

  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1; // Hitung jumlah kemunculan karakter

    if (charCount[char] > 4) {
      throw new Error(`Karakter '${char}' muncul lebih dari 3 kali.`);
    }
  }
}
