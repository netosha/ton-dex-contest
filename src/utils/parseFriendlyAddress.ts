// Big ❤️ to Steve
// Copyright 2021 Korshakov Stepan
// https://github.com/ex3ndr/ton/
// https://github.com/ex3ndr/ton/blob/4de39dd07aac35d60e3e6746c103b11a918d3218/src/address/Address.ts

const BOUNCEABLE_TAG = 0x11;
const NON_BOUNCEABLE_TAG = 0x51;
const TEST_FLAG = 0x80;

function crc16(data: Buffer) {
  const poly = 0x1021;
  let reg = 0;
  const message = Buffer.alloc(data.length + 2);
  message.set(data);
  message.forEach((byte) => {
    let mask = 0x80;
    while (mask > 0) {
      // eslint-disable-next-line no-bitwise
      reg <<= 1;
      // eslint-disable-next-line no-bitwise
      if (byte & mask) {
        reg += 1;
      }
      // eslint-disable-next-line no-bitwise
      mask >>= 1;
      if (reg > 0xffff) {
        // eslint-disable-next-line no-bitwise
        reg &= 0xffff;
        // eslint-disable-next-line no-bitwise
        reg ^= poly;
      }
    }
  });

  return Buffer.from([Math.floor(reg / 256), reg % 256]);
}

const parseFriendlyAddress = (src: string | Buffer) => {
  const data = Buffer.isBuffer(src) ? src : Buffer.from(src, 'base64');

  // 1byte tag + 1byte workchain + 32 bytes hash + 2 byte crc
  if (data.length !== 36) {
    return {
      error: 'Unknown transaction type: byte length is not equal to 36',
    };
  }

  // Prepare data
  const addr = data.slice(0, 34);
  const crc = data.slice(34, 36);
  const calcedCrc = crc16(addr);
  if (!(calcedCrc[0] === crc[0] && calcedCrc[1] === crc[1])) {
    return { error: `Invalid checksum: ${src}` };
  }

  // Parse tag
  let tag = addr[0]!;
  let isTestOnly = false;
  let isBounceable = false;
  // eslint-disable-next-line no-bitwise
  if (tag & TEST_FLAG) {
    isTestOnly = true;
    // eslint-disable-next-line no-bitwise
    tag ^= TEST_FLAG;
  }
  if (tag !== BOUNCEABLE_TAG && tag !== NON_BOUNCEABLE_TAG) {
    return { error: 'Unknown transaction tag' };
  }

  isBounceable = tag === BOUNCEABLE_TAG;

  let workchain = null;
  if (addr[1] === 0xff) {
    // TODO we should read signed integer here
    workchain = -1;
  } else {
    // eslint-disable-next-line prefer-destructuring
    workchain = addr[1];
  }

  const hashPart = addr.slice(2, 34);

  return { isTestOnly, isBounceable, workchain, hashPart };
};

export default parseFriendlyAddress;
