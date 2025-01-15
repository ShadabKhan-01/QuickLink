import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation";

export default async function Page({ params }) {

    const shortUrl = (await params).shortUrl;

    const client = await clientPromise;
    const db = client.db("quicklink");
    const collection = db.collection("URL");

    const doc = await collection.findOne({ shortUrl: shortUrl })
    if (doc) {
        redirect(doc.url);
    }
    else {
        return <div>My Post: {shortUrl}</div>
    }


}