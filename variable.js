exports.variable = (v1, v2, v3, v4, v5) => {
  let R1 = Number(120);
  let I_l = Number(1);
  let voutfrom = parseFloat(v4);
  let freq = parseFloat(v2);
  let voutTo = Number(v5);
  const v_in = Number(v1);
  const dp = Number(1);
  const I_s_rms = 1.8;

  //NOTE: steps for finding value for each coondition is almost same with some variation

  //condition for voutfrom and voutTo given that both value is negative or positive
  if ((voutfrom < 0 && voutTo < 0) || (voutfrom > 0 && voutTo > 0)) {
    const vout = voutfrom > voutTo ? voutfrom : voutTo;
    const RR = vout < 0 ? 70 : 66;
    let power = RR / 20;
    const Vin_reg = vout + dp + 1;
    const v_rpp_in_max = 0.005 * Math.pow(10, power);
    const v_in_reg_max = Vin_reg + v_rpp_in_max / 2;
    const pow_cap = Math.pow(10, 6);
    var c = Math.floor((I_l / (2 * freq * v_rpp_in_max)) * pow_cap);

    let value = v_in_reg_max / (2 * v_rpp_in_max);
    value = Math.pow(value, 0.5) * 3.14;
    const v_in_max = v_in + 10;
    const v_in_min = v_in - 10;
    const v_rms = ((v_rpp_in_max + 2 + 0.005) / (1.424 * 0.9)) * (v_in_max / v_in_min);
    const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min) / 2, 2) / 2, 0.5);
    const v_a = v_in * I_s_rms;
    const R2 = R1 * (Math.abs(vout) / 1.25) - 1;

    const v = vout < 0 ? "79" : "78";
    const suffix = vout < 10 && vout > -10 ? "0" + Math.abs(vout) : Math.abs(vout);

    const img_label = v + suffix;

    return { v_a, R2, voutTo, voutfrom, v_in, c, img_label, freq };
  }
  //condition for voutfrom and voutTo given that either of its value is negative or positive. find for both the values
  else {
    const vout_neg = voutfrom < 0 ? voutfrom : voutTo;
    const vout_psv = voutfrom > 0 ? voutfrom : voutTo;
    var v_neg;
    var v_psv;
    // condition for either voutfrom or voutTo negative
    if (vout_neg) {
      const vout = vout_neg;
      const RR = vout < 0 ? 70 : 66;
      let power = RR / 20;
      const Vin_reg = vout + dp + 1;
      const v_rpp_in_max = 0.005 * Math.pow(10, power);
      const v_in_reg_max = Vin_reg + v_rpp_in_max / 2;
      const pow_cap = Math.pow(10, 6);
      const c = Math.floor((I_l / (2 * freq * v_rpp_in_max)) * pow_cap);
      let value = v_in_reg_max / (2 * v_rpp_in_max);
      value = Math.pow(value, 0.5) * 3.14;
      const v_in_max = v_in + 10;
      const v_in_min = v_in - 10;
      const v_rms = ((v_rpp_in_max + 2 + 0.005) / (1.424 * 0.9)) * (v_in_max / v_in_min);
      const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min) / 2, 2) / 2, 0.5);
      const v_a = v_in * I_s_rms;
      const R2 = R1 * (Math.abs(vout) / 1.25) - 1;

      const v = vout < 0 ? "79" : "78";
      const suffix = vout < 10 && vout > -10 ? "0" + Math.abs(vout) : Math.abs(vout);

      const img_label = v + suffix;

      v_neg = { v_a, R2, vout, v_in, c, img_label, freq };
    }
    // condition for either voutfrom or voutTo positive

    if (vout_psv) {
      const vout = vout_psv;
      const RR = vout < 0 ? 70 : 66;
      let power = RR / 20;
      const Vin_reg = vout + dp + 1;
      const v_rpp_in_max = 0.005 * Math.pow(10, power);
      const v_in_reg_max = Vin_reg + v_rpp_in_max / 2;
      const pow_cap = Math.pow(10, 6);
      const c = Math.floor((I_l / (2 * freq * v_rpp_in_max)) * pow_cap);
      let value = v_in_reg_max / (2 * v_rpp_in_max);
      value = Math.pow(value, 0.5) * 3.14;
      const v_in_max = v_in + 10;
      const v_in_min = v_in - 10;
      const v_rms = ((v_rpp_in_max + 2 + 0.005) / (1.424 * 0.9)) * (v_in_max / v_in_min);
      const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min) / 2, 2) / 2, 0.5);
      // v_in = 2 * v_in_reg_max;
      const v_a = v_in * I_s_rms;
      const R2 = R1 * (Math.abs(vout) / 1.25) - 1;

      const v = vout < 0 ? "79" : "78";
      const suffix = vout < 10 && vout > -10 ? "0" + Math.abs(vout) : Math.abs(vout);

      const img_label = v + suffix;

      v_psv = { v_a, R2, vout, v_in, c, img_label, freq };
    }
    return { v_psv, v_neg };
  }
};

// const R2 = R1 * (Math.abs(vout) / 1.25);
//  V_rpp_in_c = V_rpp_in_max
// v_a ,R2 , 7905 , v_in

// const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min, 2)/8) ,0.5) ;

// v_in = 2 * v_in_reg_max;

// const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min, 2)/8) ,0.5) ;

// not in use
// const I_d_av = I_l * (1 + value);
// const I_d_pr = I_l * (1 + 2 * value);

// let voutmax = parseFloat(v4);
// let voutmin = parseFloat(v5);
// let vout, sign, v_rpp, RR, T_ja_device, T_jc, Tj_max, T_chs, dp, T_hsa;
// sign = 8;
// dp = 2.0;
// v_rpp = 0.005;
// RR = 62.0;
// T_ja_device = 58.3;
// T_jc = 1.0;
// Tj_max = 100.0;
// 79;
// T_chs = 0.8;

// const Vin_reg = voutfrom + dp + 1;

// const v_rpp_in_max = 0.005 * Math.pow(10, 3.1);

//   if (voutfrom > voutto) {
//     vout = voutfrom;
//     if (vout > 0) {
//       sign = 8;
//       dp = 2.0;
//       v_rpp = 0.005;
//       RR = 62.0;
//       T_ja_device = 58.3;
//       T_jc = 1.0;
//       Tj_max = 100.0;
//       T_chs = 0.8;
//       if (vout === 5.0 || vout === 6.0 || vout === 8.0 || vout === 9.0 || vout === 10.0 || vout === 12.0 || vout === 15.0 || vout === 18.0 || vout === 24.0) {
//         const calculatedValue = calculation(v1, v2, v3, vout, sign, dp, v_rpp, RR, T_ja_device, T_jc, Tj_max, T_chs);
//         return calculatedValue;
//       }
//     } else if (vout < 0) {
//       sign = 9;
//       dp = 1.1;
//       RR = 66.0;
//       T_ja = 60;
//       T_jc = 5.6;
//       Tj_max = 100.0;
//       T_chs = 0.8;
//       if (vout === 5.0 || vout === 6.0 || vout === 8.0 || vout === 9.0 || vout === 10.0 || vout === 12.0 || vout === 15.0 || vout === 18.0 || vout === 24.0) {
//         const calculatedValue = calculation(sign, dp, v_rpp, RR, T_ja_device, T_jc, Tj_max, T_chs);
//         return calculatedValue;
//       }
//     }
//   }
// };

// exports.absValue = (docs, x) => {
//   const indexArr = docs.map((value) => {
//     return Math.abs(value.value - x);
//   });
//   const min = Math.min.apply(Math, indexArr);

//   return docs[indexArr.indexOf(min)].value;
// };

// function calculation(v1, v2, v3, vout, sign, dp, v_rpp, RR, T_ja_device, T_jc, Tj_max, T_chs) {
//   f = parseFloat(v2);
//   v_in = parseFloat(v1);
//   Ta = parseFloat(v3);

//   v_in_min = parseFloat(vout) + dp + 1.0;
//   console.log(v_in_min);
//   v_rpp_in_max = parseFloat(v_rpp * (Math.pow(10.0 ** RR), 1.0 / 20.0));
//   console.log(v_rpp_in_max);
//   v_in_max = parseFloat(v_in_min + v_rpp_in_max / 2.0);
//   console.log(v_in_max);
//   c = parseFloat(1000000.0 / (2.0 * f * v_rpp_in_max) / 1000000) * 2;
//   console.log(c);
//   v_rpp_in_max = parseFloat(1.0 / (2.0 * f * c));
//   v_rms = ((v_in_max + 2.0 + v_rpp) * (v_in + 10.0)) / (1.414 * 0.9 * (v_in - 10.0));
//   va = v_rms * 1.8;
//   n = v_in / v_rms;
//   Pd = v_in_min - parseFloat(vout);
//   T_ja_cal = (Tj_max - Ta) / Pd;
//   if (T_ja_cal < T_ja_device) {
//     T_hsa = T_ja_cal - T_jc - T_chs;

//     return [va, T_hsa, sign, c, vout];
//   }
// }
