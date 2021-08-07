exports.constant = (c1, c2, c3, c4) => {
  let R1 = Number(120);
  let I_l = Number(1);
  let vout = parseFloat(c4);
  let freq = parseFloat(c2);
  const v_in = Number(c1);
  const dp = Number(1);

  const I_s_rms = 1.8;

  const RR = vout < 0 ? 54 : 62;
  let power = RR / 20;
  const Vin_reg = vout + dp + 1;
  const v_rpp_in_max = 0.005 * Math.pow(10, power);
  const v_in_reg_max = Vin_reg + v_rpp_in_max / 2;
  // const R2 = R1 * (Math.abs(vout) / 1.25);
  //  V_rpp_in_c = V_rpp_in_max
  const c = I_l / (2 * freq * v_rpp_in_max);

  let value = v_in_reg_max / (2 * v_rpp_in_max);
  value = Math.pow(value, 0.5) * 3.14;

  const I_d_av = I_l * (1 + value);
  const I_d_pr = I_l * (1 + 2 * value);
  const v_in_max = v_in + 10;
  const v_in_min = v_in - 10;
  const v_rms = ((v_rpp_in_max + 2 + 0.005) / (1.424 * 0.9)) * (v_in_max / v_in_min);
  // const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min, 2)/8) ,0.5) ;
  const v_in_rms = Math.pow(Math.pow((v_in_max + v_in_min) / 2, 2) / 2, 0.5);
  // v_in = 2 * v_in_reg_max;
  const v_a = v_in * I_s_rms;
  const R2 = R1 * (vout / 1.25) - 1;
  const v_o = 1.25 * (1 + R2 / R1);

  const v = vout < 0 ? "79" : "78";
  const suffix = vout < 10 && vout > -10 ? "0" + Math.abs(vout) : Math.abs(vout);
  console.log(suffix);
  const img_label = v + suffix;

  // v_a ,R2 , 7905 , v_in
  return { v_a, R2, vout, v_in, c, img_label };
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
