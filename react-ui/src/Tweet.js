import * as React from "react";

export function Tweet(props) {
    const tweet = props.tweet;
    console.info(tweet);
    return (
        <div className="p-col-12">
            <div className="p-grid">
                <div className="p-col-2">
                    <img src={tweet.user.profile_image_url || ""} alt={tweet.user.profile_image_url}/>
                    <div><p>{tweet.user.name}</p></div>
                </div>
                <div className="p-col-8">{tweet.text}</div>
                <div className="p-col-2">
                    <div>{parseTwitterDate(tweet.created_at)}</div>
                </div>
            </div>
            <hr style={{color: "#d9dad9"}}/>
        </div>
    );
}

function parseTwitterDate(str) {
    var months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };

    try {       
        const dateArray = str.split(" ");
        const day =  [dateArray[5], months[dateArray[1]], dateArray[2]].join("-");
        const time = dateArray[3];
        const isoDateString = `${day}T${time}Z`;
        const date = new Date(isoDateString);
        if (isFinite(date)) {
            return date.toLocaleString();
        }

        return null;
    }
    catch (e) {
        return null;
    }
}