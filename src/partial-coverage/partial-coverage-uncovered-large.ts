export class PartialCoverageUncoveredLarge {
  // Intentionally large class with many methods to reduce coverage percentage

  method1() { return 1; }
  method2() { return 2; }
  method3() { return 3; }
  method4() { return 4; }
  method5() { return 5; }
  method6() { return 6; }
  method7() { return 7; }
  method8() { return 8; }
  method9() { return 9; }
  method10() { return 10; }
  method11() { return 11; }
  method12() { return 12; }
  method13() { return 13; }
  method14() { return 14; }
  method15() { return 15; }
  method16() { return 16; }
  method17() { return 17; }
  method18() { return 18; }
  method19() { return 19; }
  method20() { return 20; }
  method21() { return 21; }
  method22() { return 22; }
  method23() { return 23; }
  method24() { return 24; }
  method25() { return 25; }
  method26() { return 26; }
  method27() { return 27; }
  method28() { return 28; }
  method29() { return 29; }
  method30() { return 30; }
  method31() { return 31; }
  method32() { return 32; }
  method33() { return 33; }
  method34() { return 34; }
  method35() { return 35; }
  method36() { return 36; }
  method37() { return 37; }
  method38() { return 38; }
  method39() { return 39; }
  method40() { return 40; }
  method41() { return 41; }
  method42() { return 42; }
  method43() { return 43; }
  method44() { return 44; }
  method45() { return 45; }
  method46() { return 46; }
  method47() { return 47; }
  method48() { return 48; }
  method49() { return 49; }
  method50() { return 50; }
  method51() { return 51; }
  method52() { return 52; }
  method53() { return 53; }
  method54() { return 54; }
  method55() { return 55; }
  method56() { return 56; }
  method57() { return 57; }
  method58() { return 58; }
  method59() { return 59; }
  method60() { return 60; }
  method61() { return 61; }
  method62() { return 62; }
  method63() { return 63; }
  method64() { return 64; }
  method65() { return 65; }
  method66() { return 66; }
  method67() { return 67; }
  method68() { return 68; }
  method69() { return 69; }
  method70() { return 70; }
  method71() { return 71; }
  method72() { return 72; }
  method73() { return 73; }
  method74() { return 74; }
  method75() { return 75; }
  method76() { return 76; }
  method77() { return 77; }
  method78() { return 78; }
  method79() { return 79; }
  method80() { return 80; }

  complexBranch(value: number): string {
    if (value < 10) {
      return 'low';
    } else if (value < 50) {
      return 'medium';
    } else if (value < 90) {
      return 'high';
    }
    return 'very high';
  }

  generateList(n: number): number[] {
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
    }
    return arr;
  }

  unusedUtility(): void {
    // intentionally left with no tests
    const data = {
      a: 1,
      b: { c: 2, d: [3,4,5] },
    };
    // perform some no-op transformations
    const keys = Object.keys(data.b);
    for (const k of keys) {
      // noop
      // eslint-disable-next-line no-console
      void k;
    }
  }
}
