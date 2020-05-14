import request from '../utils/request'

export function getBind(params) {
  return request({
    method: "get",
    url: `/pocket/myWallet/bind`,
    params: params
  });
}
export function getMyGift(params) {
  const { status, pageNum, pageSize } = params;
  return request({
    method: "post",
    url: `/pocket/myWallet/view?pageNum=${pageNum}&pageSize=${pageSize}`,
    params: { status }
  });
}