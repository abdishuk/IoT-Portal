const lamp0 = {
  m2mae: {
    rn: "LAMP_0",
    ty: 2,
    ri: "/mn-cse/CAE610333489",
    pi: "/mn-cse",
    ct: "20210817T093949",
    lt: "20210817T093949",
    acpi: ["/mn-cse/acp-634357041"],
    et: "20220817T093949",
    api: "LAMP_0",
    aei: "CAE610333489",
    poa: ["sample"],
    ch: [
      {
        nm: "DATA",
        typ: 3,
        val: "/mn-cse/cnt-195859929",
      },
      {
        nm: "DESCRIPTOR",
        typ: 3,
        val: "/mn-cse/cnt-266403442",
      },
    ],
    rr: true,
  },
};

const lamp1 = {
  m2mae: {
    rn: "LAMP_1",
    ty: 2,
    ri: "/mn-cse/CAE951096632",
    pi: "/mn-cse",
    ct: "20210817T093950",
    lt: "20210817T093950",
    acpi: ["/mn-cse/acp-634357041"],
    et: "20220817T093950",
    api: "LAMP_1",
    aei: "CAE951096632",
    poa: ["sample"],
    ch: [
      {
        nm: "DATA",
        typ: 3,
        val: "/mn-cse/ccnt-620842219",
      },
      {
        nm: "DESCRIPTOR",
        typ: 3,
        val: "/mn-cse/ccnt-785766341",
      },
    ],
    rr: true,
  },
};

const lampAll = {
  m2mae: {
    rn: "LAMP_All",
    ty: 2,
    ri: "/mn-cse/CAE840981360",
    pi: "/mn-cse",
    ct: "20210817T093950",
    lt: "20210817T093950",
    acpi: ["/mn-cse/acp-634357041"],
    et: "20220817T093950",
    api: "LAMP_ALL",
    aei: "CAE840981360",
    poa: ["sample"],
    ch: [
      {
        nm: "DESCRIPTOR",
        typ: 3,
        val: "/mn-cse/cnt-194557939",
      },
    ],
    rr: true,
  },
};

const Lamp0Descriptor = {
  m2mcnt: {
    rn: "DESCRIPTOR",
    ty: 3,
    ri: "/mn-cse/cnt-266403442",
    pi: "/mn-cse/CAE610333489",
    ct: "20210817T093950",
    lt: "20210817T093950",
    acpi: ["/mn-cse/acp-634357041"],
    et: "20220817T093950",
    st: 1,
    mni: 10,
    mbs: 10000,
    mia: 0,
    cni: 1,
    cbs: 658,
    ch: [
      {
        nm: "cin_658272813",
        typ: 4,
        val: "/mn-cse/cin-658272813",
      },
    ],
    ol: "/mn-cse/mn-name/LAMP_0/DESCRIPTOR/ol",
    la: "/mn-cse/mn-name/LAMP_0/DESCRIPTOR/la",
  },
};

const Lamp1Descriptor = {
  m2mcnt: {
    rn: "DESCRIPTOR",
    ty: 3,
    ri: "/mn-cse/cnt-785766341",
    pi: "/mn-cse/CAE951096632",
    ct: "20210817T093950",
    lt: "20210817T093950",
    acpi: ["/mn-cse/acp-634357041"],
    et: "20220817T093950",
    st: 1,
    mni: 10,
    mbs: 10000,
    mia: 0,
    cni: 1,
    cbs: 658,
    ch: [
      {
        nm: "cin_885488579",
        typ: 4,
        val: "/mn-cse/cin-885488579",
      },
    ],
    ol: "/mn-cse/mn-name/LAMP_1/DESCRIPTOR/ol",
    la: "/mn-cse/mn-name/LAMP_1/DESCRIPTOR/ol",
  },
};

const LampAllDescriptor = {
  m2mcnt: {
    rn: "DESCRIPTOR",
    ty: 3,
    ri: "/mn-cse/cnt-194557939",
    pi: "/mn-cse/CAE840981360",
    ct: "0210817T093950",
    lt: "20210817T093950",
    acpi: ["/mn-cse/acp-634357041"],
    et: "20220817T093950",
    st: 1,
    mni: 10,
    mbs: 10000,
    mia: 0,
    cni: 1,
    cbs: 310,
    ch: [
      {
        nm: "cin_862049947",
        typ: 4,
        val: "/mn-cse/cin-862049947",
      },
    ],
    ol: "/mn-cse/mn-name/LAMP_ALL/DESCRIPTOR/ol",
    la: "/mn-cse/mn-name/LAMP_ALL/DESCRIPTOR/la",
  },
};

const lamp0_Cin = {
  m2mcin: {
    rn: "cin_658272813",
    ty: 4,
    ri: "/mn-cse/cin-658272813",
    pi: "/mn-cse/cnt-266403442",
    ct: "20210817T093950",
    lt: "20210817T093950",
    st: 0,
    cnf: "application/obix",
    cs: 658,
    con: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<obj>\n    <str val="LAMP" name="type"/>\n    <str val="Home" name="location"/>\n    <str val="LAMP_0" name="appId"/>\n    <op href="/mn-cse/mn-name/LAMP_0/DATA/la" name="getState" is="retrieve"/>\n    <op href="/mn-cse/mn-name/LAMP_0?op=getStateDirect&amp;lampid=LAMP_0" name="getState(Direct)" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_0?op=setOn&amp;lampid=LAMP_0" name="switchON" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_0?op=setOff&amp;lampid=LAMP_0" name="switchOFF" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_0?op=toggle&amp;lampid=LAMP_0" name="toggle" is="execute"/>\n</obj>\n',
  },
};

const lamp1_Cin = {
  m2mcin: {
    rn: "cin_885488579",
    ty: 4,
    ri: "/mn-cse/cin-885488579",
    pi: "/mn-cse/cnt-785766341",
    ct: "20210817T093950",
    lt: "20210817T093950",
    st: 0,
    cnf: "application/obix",
    cs: 658,
    con: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<obj>\n    <str val="LAMP" name="type"/>\n    <str val="Home" name="location"/>\n    <str val="LAMP_1" name="appId"/>\n    <op href="/mn-cse/mn-name/LAMP_1/DATA/la" name="getState" is="retrieve"/>\n    <op href="/mn-cse/mn-name/LAMP_1?op=getStateDirect&amp;lampid=LAMP_1" name="getState(Direct)" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_1?op=setOn&amp;lampid=LAMP_1" name="switchON" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_1?op=setOff&amp;lampid=LAMP_1" name="switchOFF" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_1?op=toggle&amp;lampid=LAMP_1" name="toggle" is="execute"/>\n</obj>\n',
  },
};

const lamp_All_Cin = {
  m2mcin: {
    rn: "cin_862049947",
    ty: 4,
    ri: "/mn-cse/cin-862049947",
    pi: "/mn-cse/cnt-194557939",
    ct: "20210817T093950",
    lt: "20210817T093950",
    st: 0,
    cnf: "application/obix",
    cs: 310,
    con: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<obj>\n    <op href="/mn-cse/mn-name/LAMP_ALL?op=allOn" name="setOn" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_ALL?op=allOff" name="setOff" is="execute"/>\n    <op href="/mn-cse/mn-name/LAMP_ALL?op=allToggle" name="allToggle" is="execute"/>\n</obj>\n',
  },
};

export {
  lamp0,
  lamp1,
  lampAll,
  lamp0_Cin,
  lamp_All_Cin,
  lamp1_Cin,
  Lamp0Descriptor,
  Lamp1Descriptor,
  LampAllDescriptor,
};
