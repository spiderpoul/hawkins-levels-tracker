import { NowRequest, NowResponse } from '@now/node';

const data:any = [];

export default (_req: NowRequest, res: NowResponse) => {
  const {body} = _req;
  data.push(body);
  res.status(200).send(data);
};
