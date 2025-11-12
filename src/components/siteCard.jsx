import Link from "next/link";

const SiteCard = ({ title, description, coverImage, category, siteUrl }) => {

    
    return (
        <div>
           
            <Link
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
                {coverImage && (
                    <Image
                        src={coverImage}
                        alt={title}
                        width={400}
                        height={200}
                        className="rounded mb-4 object-cover"
                    />
                )}

                <h2 className="text-xl font-semibold mb-1">{title}</h2>

                <p className="text-gray-600 text-sm line-clamp-3">{description}</p>

                <span className="mt-2 text-gray-600 text-sm line-clamp-3 w-28">
                    {category}
                </span>
            </Link>
        </div>
    );
}

export default SiteCard;