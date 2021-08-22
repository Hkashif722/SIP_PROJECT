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

    return { v_a, R2, vout, voutfrom, voutTo, v_in, c, img_label, freq };
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