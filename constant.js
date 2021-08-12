exports.constant = (c1, c2, c3, c4) => {
  let R1 = Number(120);
  let I_l = Number(1);
  let vout = parseFloat(c4);
  let freq = parseFloat(c2);
  const v_in = Number(c1);
  const dp = Number(1);
  const I_s_rms = 1.8;
  const v_out_ptv = [5, 6, 8, 9, 10, 12, 15, 18, 24];
  const v_out_neg = [-5, -8, -9, -10, -12, -15, -18];
  let RR;

  if (vout > 0) RR = v_out_ptv.find((value) => value === vout) ? 62 : 66;
  else RR = v_out_neg.find((value) => value === vout) ? 54 : 70;

  console.log(RR);

  let power = RR / 20;
  const Vin_reg = vout + dp + 1;
  const v_rpp_in_max = 0.005 * Math.pow(10, power);
  const v_in_reg_max = Vin_reg + v_rpp_in_max / 2;
  // const R2 = R1 * (Math.abs(vout) / 1.25);
  //  V_rpp_in_c = V_rpp_in_max
  const pow_cap = Math.pow(10, 6);
  const c = Math.floor((I_l / (2 * freq * v_rpp_in_max)) * pow_cap);

  let value = v_in_reg_max / (2 * v_rpp_in_max);
  value = Math.pow(value, 0.5) * 3.14;

  const I_d_av = I_l * (1 + value);
  const I_d_pr = I_l * (1 + 2 * value);
  // variable
  // const v_in_max = v_in + 10;
  // const v_in_min = v_in - 10;
  const v_rms = ((v_rpp_in_max + 2 + 0.005) / (1.424 * 0.9)) * v_in;
  // const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min, 2)/8) ,0.5) ;
  const v_in_rms = Math.pow(Math.pow(v_in / 2, 2) / 2, 0.5);
  // v_in = 2 * v_in_reg_max;
  const n = v_in_rms / v_rms;
  const v_a = v_in * I_s_rms;
  const R2 = R1 * (Math.abs(vout) / 1.25) - 1;
  const v_o = 1.25 * (1 + R2 / R1);

  const v = vout < 0 ? "79" : "78";
  const suffix = vout < 10 && vout > -10 ? "0" + Math.abs(vout) : Math.abs(vout);

  const img_label = v + suffix;

  // v_a ,R2 , 7905 , v_in
  return { v_a, R2, vout, v_in, c, img_label, freq, n };
};

// let voutmin = parseFloat(v5);
// let vout, sign, v_rpp, RR, T_ja_device, T_jc, Tj_max, T_chs, dp, T_hsa;
// sign = 8;
// dp = 2.0;
// v_rpp = 0.005;
// RR = 62.0;
// T_ja_device = 58.3;
// T_jc = 1.0;
// Tj_max = 100.0;
// T_chs = 0.8;
