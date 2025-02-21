import clientPromise from "@/lib/mongodb";

const client = await clientPromise;
const db = client.db("quicklink");

export async function POST(request) {
    const body = await request.json();
    const collection = db.collection("URL");
    let data = null
    if (body.label === "All") {
      data = await collection.find({userId:body.userId}).toArray();
    }
    else {
      data = await collection.find({userId:body.userId,label:body.label}).toArray();
    }

    // Convert MongoDB ObjectId to string for the client
    const items = data.map((item) => ({
      url: item.url,
      shortUrl: item.shortUrl,
      visits: item.visits
    }));

    return Response.json(items);

}

export async function DELETE(request) {
    const body = await request.json();

    const collection = db.collection("URL");

    //  await collection.deleteMany(body)
    await body.shortUrl.map(async (item)=>{await collection.deleteMany({shortUrl:item})})
    const data = await collection.find({userId:body.userId}).toArray();

    // Convert MongoDB ObjectId to string for the client
    const items = data.map((item) => ({
      url: item.url,
      shortUrl: item.shortUrl,
      visits: item.visits
    }));

    console.log(body.shortUrl);
    
    return Response.json(items);

  
}