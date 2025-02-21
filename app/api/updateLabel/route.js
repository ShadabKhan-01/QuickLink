import clientPromise from "@/lib/mongodb";

const client = await clientPromise;
const db = client.db("quicklink");

export async function PUT(request) {

    const body = await request.json();
    const collection = db.collection("URL");
    // Update all selected items with the new label
    await collection.updateMany(
        { shortUrl: { $in: body.shortUrl }, userId: body.userId },
        { $set: { label: body.label } }
    );
    console.log(body.label)
    console.log(body.shortUrl)
    console.log(body.userId)

    return Response.json({ success: true, message: "Labels updated" });

}