import expect from 'unexpected';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url =
	'https://al3xback.github.io/fmentor-article-preview-mocha-unexpected/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have an author image element which has alt and dimension equals to mockup data', () => {
		const cardAuthorImgEl = document.querySelector('.card__author-img');

		const authorImgData = {
			width: parseInt(cardAuthorImgEl.getAttribute('width')),
			height: parseInt(cardAuthorImgEl.getAttribute('height')),
			alt: cardAuthorImgEl.getAttribute('alt'),
		};

		const mockupAuthorImgData = {
			width: 40,
			height: 40,
			alt: 'Michelle Appleton',
		};

		expect(authorImgData, 'to satisfy', mockupAuthorImgData);
	});

	it("should have a 'Share' text", () => {
		const shareTextEl = document.querySelector('.card__share-action-txt');
		const isShareTextExist =
			shareTextEl.textContent.indexOf('Share') !== -1;

		expect(isShareTextExist, 'to equal', true);
	});

	it('should have three share button elements', () => {
		const shareBtnEls = document.querySelectorAll(
			'.card__share-action-buttons li'
		);

		expect(shareBtnEls.length, 'to equal', 3);
	});
});
