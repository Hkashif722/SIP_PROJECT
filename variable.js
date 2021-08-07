exports.variable = (v1, v2, v3, v4, v5) => {
  let voutmax = parseFloat(v4);
  let voutmin = parseFloat(v5);
  let vout, sign, v_rpp, RR, T_ja_device, T_jc, Tj_max, T_chs, dp, T_hsa;
  sign = 8;
  dp = 2.0;
  v_rpp = 0.005;
  RR = 62.0;
  T_ja_device = 58.3;
  T_jc = 1.0;
  Tj_max = 100.0;
  79;
  T_chs = 0.8;

  const Vin_reg = voutfrom + dp + 1;

  const v_rpp_in_max = 0.005 * Math.pow(10, 3.1);
};

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
