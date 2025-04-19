interface GifCard {
    title: string;
    url: string;
}

export default function GifCard({title, url}: GifCard) {
    return (
        <div className="w-full max-w-[350px] bg-white rounded">
            <img src={url} alt={title} className="rounded-t-md" />
            <h3 className="py-4 px-2 text-base text-center font-medium">{title}</h3>
        </div>
    )
}
