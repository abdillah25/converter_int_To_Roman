const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener("click", handlerButtonClick);

// fungsi mengambil value button
function handlerButtonClick(e) {
  if (e.target.tagName === "INPUT") {
    const buttonValue = e.target.value;

    // kode untuk menampilkan nomor ke display
    const displayConverter = document.getElementById("display-number");
    let displayRoman = document.getElementById("display-roman");
    const displayConverterValue = displayConverter.textContent;

    try {
      // kondisi untuk menghapus value
      if (buttonValue === "Clear") {
        displayConverter.textContent = "";
        displayRoman.textContent = "";
      }
      //   kondisi jika button yang di klik valuenya bukan ""
      if (buttonValue !== "=" && buttonValue !== "Clear") {
        displayConverter.textContent += buttonValue;
      }
      // kondisi untuk menampilkan hasil
      if (buttonValue === "=") {
        romanToInteger(displayConverterValue);
      }
    } catch (error) {
      // tampat untuukk menampilkan error
      displayRoman.textContent = error;
      console.info(error);
    }
  }
}

function romanToInteger(roman) {
  const romanToInt = {
    M̅: 1000000,
    D̅: 500000,
    C̅: 100000,
    L̅: 50000,
    X̅: 10000,
    V̅: 5000,
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let displayRoman = document.getElementById("display-roman");
  let result = 0;
  let i = 0;

  while (i < roman.length) {
    let currentChar = roman[i];
    let nextChar = roman[i + 1];

    // Jika karakter saat ini dan karakter berikutnya ada di dalam romanToInt
    if (romanToInt[currentChar + nextChar]) {
      result += romanToInt[currentChar + nextChar];
      i += 2; // Loncati karakter berikutnya karena sudah dihitung bersama
    } else if (romanToInt[currentChar] < romanToInt[nextChar]) {
      // Kasus ketika angka Romawi saat ini lebih kecil dari angka Romawi berikutnya
      result += romanToInt[nextChar] - romanToInt[currentChar];
      i += 2; // Loncati karakter berikutnya karena sudah dihitung bersama
    } else {
      result += romanToInt[currentChar];
      i++;
    }
  }

  // Cek apakah ada pengulangan karakter yang melebihi batas 3 (contoh: IIII = IV, XXXX = XL, CCCC = CD)
  const regex = /(I{4,}|V{4,}|X{4,}|L{4,}|C{4,}|D{4,}|M{4,})/g;
  if (regex.test(roman)) {
    displayRoman.textContent = "Input invalid! Perhatikan aturan pengulangan angka Romawi.";
    return null;
  }

  // Cek apakah ada pengurangan karakter yang tidak diperbolehkan (contoh: VX = V - X = IV)
  const invalidSubtraction = /(V[XLCDM]|L[CDM]|D[M])/g;
  if (invalidSubtraction.test(roman)) {
    displayRoman.textContent = "Input invalid! Perhatikan aturan pengurangan angka Romawi.";
    return null;
  }

  displayRoman.textContent = result;
  return result;
}
