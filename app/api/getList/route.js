import clientPromise from "@/lib/mongodb";

const client = await clientPromise;
const db = client.db("quicklink");

export async function POST(request) {
    const body = await request.json();
    const collection = db.collection("URL");

    const data = await collection.find({userId:body.userId}).toArray();

    // Convert MongoDB ObjectId to string for the client
    const items = data.map((item) => ({
      url: item.url,
      shortUrl: item.shortUrl,
      visits: item.visits
    }));

    return Response.json(items);

}

export async function DELETE(request) {
    // const body = await request.json();

    // const collection = db.collection("URL");

    //  await collection.({userId:body.userId}).toArray();
    // const data = await collection.find({userId:body.userId}).toArray();

    // // Convert MongoDB ObjectId to string for the client
    // const items = data.map((item) => ({
    //   url: item.url,
    //   shortUrl: item.shortUrl,
    //   visits: item.visits
    // }));

    // return Response.json(items);

    console.log(body);
  
}