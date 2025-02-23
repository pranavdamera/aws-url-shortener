import React, { use, useState } from "react";
import { Input, Button, Link } from "@heroui/react"
import { post } from "../../amplify/backend/function/amplifyurlshortenera1de62e4/src/app";

export default function Home(){
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try{
        const restOperation = post({
            apiName: 'apiurlshortener',
            path: '/', 
            options: {
                body: {
                    long_url: longUrl
                }
            }
        })
        const {body} = await restOperation.response;
        const res = await body.json();
        const origin = window.location.href;
        setShortUrl(origin+res.short_url);
        console.log(res)
    } catch (error) {
        console.log('POST call failed: ', error)
    }
    setLongUrl('');
    setLoading(false)
  }
  return(
    <div className="flex flex-col justify-center items-center h-screen">
        <h1 className='text-2xl font-bold mb-3'>URL <Shortener></Shortener></h1>
        <form onSubmit={handleSubmit}>
            <Input
                className = 'max-w-lg mr-2'
                type = 'url'
                name="long_url"
                id='long_url'
                value={longUrl}
                isDisabled={loading}
                size='lg'
                placeholders='Enter the URL'
                onChange={(e)=>setLongUrl(e.target.value)}
                isRequired
                />
        <Button isLoading={loading} color='primary' type='submit'>Submit</Button>
    </form>
    {
        shortUrl &&
        <div className="mt-3">
            <span className="mr-3">Copy the link</span>
            <Link href={shortUrl}>{shortUrl}</Link>
        </div>
    }
    </div>
  )
}
