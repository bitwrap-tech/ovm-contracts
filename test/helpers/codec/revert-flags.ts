import { ethers } from '@nomiclabs/buidler'
import { hexZeroPad } from 'ethers/lib/utils'

export const encodeRevertData = (
  flag: number,
  data: string = '0x',
  nuisanceGasLeft: number = 0,
  ovmGasRefund: number = 0
): string => {
  const abiEncoded: string = ethers.utils.defaultAbiCoder.encode(
    ['uint256', 'uint256', 'uint256', 'bytes'],
    [flag, nuisanceGasLeft, ovmGasRefund, data]
  )
  return abiEncoded
}

export const decodeRevertData = (revertData: string): any => {
  // const length: number = revertData.length/2 - 1
  // const reencodedRevertData = '0x' + hexZeroPad('0x' + length.toString(16), 32) + revertData.slice(2)
  const decoded = ethers.utils.defaultAbiCoder.decode(
    ['uint256', 'uint256', 'uint256', 'bytes'],
    revertData
  )
  console.log(`flag is: ${decoded[0].toNumber()}`)
  return (
    '[revertFlag:' +
    Object.keys(REVERT_FLAGS)[decoded[0]] +
    ', nuisanceGasLeft:' +
    decoded[1] +
    ', ovmGasRefund: ' +
    decoded[2] +
    ', data: ' +
    decoded[3] +
    ']'
  )
}

export const REVERT_FLAGS = {
  DID_NOT_REVERT: 0,
  OUT_OF_GAS: 1,
  INTENTIONAL_REVERT: 2,
  EXCEEDS_NUISANCE_GAS: 3,
  INVALID_STATE_ACCESS: 4,
  UNSAFE_BYTECODE: 5,
  CREATE_COLLISION: 6,
  STATIC_VIOLATION: 7,
  CREATE_EXCEPTION: 8,
}
