import request from '../utils/request'

export function getVerifySms(params) {
  return request({
    method: "post",
    url: `/pocket/app/login`,
    header: {'content-type': 'application/x-www-form-urlencoded'},
    params
  });
}

export function getSms(params) {
  return request({
    method: 'GET',
    url: `/pocket/app/existsAccSendMessage`,
    params: params
  })
}