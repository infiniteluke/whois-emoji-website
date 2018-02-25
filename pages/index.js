import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import Head from '../components/head';
import pkg from '../package.json';

const CORS_PROXY = 'https://cors-new.now.sh/';

const WhoisEmoji = class extends Component {
  static async getInitialProps({ query: { d } }) {
    let whois = {};
    if (d) {
      const res = await fetch(
        `${CORS_PROXY}https://puny-whois.now.sh/?d=${encodeURIComponent(d)}`
      );
      whois = await res.json();
    }
    return { whois, domain: d };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState(() => ({
        placeholder: this.emojiIterator.next().value,
      }));
    }, 2000);
  }

  static *getEmojiUrl() {
    const urls = [
      'keepit💯.ws',
      '🍕😺.ws',
      '📙.ws',
      '🕶.ws',
      '🌑.ws',
      '🐮.ws',
      'i❤️🍕.ws',
    ];
    let i = 0;
    for (;;) {
      i += 1;
      yield urls[i % urls.length];
    }
  }
  emojiIterator = this.constructor.getEmojiUrl();
  state = {
    placeholder: this.emojiIterator.next().value,
  };
  render() {
    return (
      <div className="wrapper">
        <Head
          title="WHOIS Emoji"
          description="Search WHOIS records for domains including emoji domains."
        />
        <h1>
          WHOIS Emoji
          <span role="img" aria-label="crystal ball">
            🔮
          </span>
        </h1>
        <form>
          <input
            type="text"
            name="d"
            defaultValue={this.props.domain}
            placeholder={this.state.placeholder}
          />
          <input type="submit" value="🔍" />
        </form>
        {this.props.domain && (
          <section>
            <h2>WHOIS for {this.props.domain}</h2>
            <div className="whois-output">
              {Object.keys(this.props.whois).length ? (
                Object.entries(this.props.whois).map(entry => (
                  <div key={entry[0]} className="whois-entry">{`${entry[0]}: ${
                    entry[1]
                  }`}</div>
                ))
              ) : (
                <p>No WHOIS entry found.</p>
              )}
            </div>
          </section>
        )}
        <footer>
          <p>
            Made with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            by <a href={pkg.repository.url}>infiniteluke</a>
          </p>
        </footer>
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
          form input[type='text'] {
            border: 1px solid #e1e1e1;
            width: 100%;
            max-width: 500px;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            height: 100px;
            font-size: 45px;
            padding: 25px;
          }
          form input[type='submit'] {
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
          footer {
            padding: 60px 0 25px 0;
            font: 25px Helvetica, Arial, sans-serif;
          }
        `}</style>
      </div>
    );
  }
};
WhoisEmoji.defaultProps = {
  domain: '',
};
WhoisEmoji.propTypes = {
  domain: PropTypes.string,
  whois: PropTypes.shape({}).isRequired,
};
export default WhoisEmoji;
