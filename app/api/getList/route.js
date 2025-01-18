import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("quicklink");
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