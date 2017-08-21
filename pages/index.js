import "isomorphic-fetch";
import Head from "../components/head";

export default class WhoisPuny extends React.Component {
  static async getInitialProps({ query: { d } }) {
    let whois = {};
    if (d) {
      const res = await fetch(
        `https://cors.now.sh/https://puny-whois.now.sh/?d=${encodeURIComponent(
          d
        )}`
      );
      whois = await res.json();
      console.log(whois);
    }
    return { whois, domain: d };
  }

  static getRandomPunyUrl() {
    const urls = ["keepit💯.ws", "🍕😺.ws", "📙.ws", "🕶.ws", "🌑.ws"];
    return urls[Math.floor(Math.random() * urls.length)];
  }

  render() {
    return (
      <div className="wrapper">
        <Head
          title="WHOIS Emoji"
          description="Search WHOIS records for domains including emoji domains."
        />
        <h1>WHOIS</h1>
        <form>
          <input
            type="text"
            name="d"
            defaultValue={this.props.domain}
            placeholder={this.constructor.getRandomPunyUrl()}
          />
          <input type="submit" value="🔍" />
        </form>
        {this.props.domain &&
          <section>
            <h2>
              WHOIS for {this.props.domain}
            </h2>
            <div className="whois-output">
              {Object.keys(this.props.whois).length
                ? Object.entries(this.props.whois).map(entry =>
                    <div className="whois-entry">{`${entry[0]}: ${entry[1]}`}</div>
                  )
                : <p>No WHOIS entry found.</p>}
            </div>
          </section>}
        <style jsx>{`
          * {
            box-sizing: border-box;
          }
          .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
            max-width: 1000px;
            padding: 20px;
          }
          h1 {
            font: 75px Helvetica, Arial, sans-serif;
            padding: 30px 0;
          }
          form {
            display: flex;
            align-items: flex-end;
          }
          form input[type="text"] {
            border: 1px solid #e1e1e1;
            width: 100%;
            max-width: 500px;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            height: 100px;
            font-size: 45px;
            padding: 25px;
          }
          form input[type="submit"] {
            border: none;
            background-color: #e1e1e1;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            box-sizing: border-box;
            height: 100px;
            font-size: 45px;
            padding: 25px;
          }
          h2 {
            text-align: center;
            font: 50px Helvetica, Arial, sans-serif;
          }
          .whois-output {
            font-size: 25px;
          }
          .whois-entry {
            padding: 5px 0;
          }
        `}</style>
      </div>
    );
  }
}
