import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../errors/statusCodeMessage";
import LeasingService from "../../../services/leasingService";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transaction/transactionService";
import { convertBiggestCoinUnit } from "../../../utils/numbers"

const leasingService = new LeasingService();
const coinService = new CoinService();
const transactionService = new TransactionService();


export function* getProfessionalNode() {
  try {
    let response = yield call(leasingService.getProfessionalNodes);
    yield put({
      type: "GET_PROFESSIONAL_NODE",
      professionalNode: response
    });

    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* validateLeasingAddress(action) {
  try {
    let response = yield call(coinService.validateAddress,
      action.coin,
      action.address);

    if (!response.error) {
      yield put({
        type: "VALIDATE_LEASING_ADDRESS",
        addressIsValid: response
      });
      return;
    }

    yield put(response.error);


    return;
  } catch (error) {
    yield put(internalServerError());
  }
}

export function* createLeasing(action) {
  try {

    let leaseData = {

      address: action.data.coinAddress,
      amount: convertBiggestCoinUnit(action.data.amount),
      fee: action.data.feeValue,
      recipient: action.data.toAddress
    }

    let response = yield call(transactionService.createLeasing, leaseData);

    if (!response.error) {
      yield put({
        type: "START_LEASING",
      });
      return;
    }
    yield put(response.error);


    return;
  } catch (error) {
    yield put(internalServerError());
  }
}