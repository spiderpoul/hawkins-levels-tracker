import { client, q } from "./client"


module.exports = async (req, res) => {
  try {
    const dbs: any = await client.query(
      q.Create(
        q.Ref(q.Collection('levels-data'), Date.now()),
        { data: { value: req.body?.level, task: req.body?.task } },
      )
    )
    // ok
    res.status(200).json(dbs?.data)    
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message })
  }
}