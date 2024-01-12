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
		const shareButtonElements = document.querySelector('.card__author-img');

		const authorImageData = {
			width: shareButtonElements.width,
			height: shareButtonElements.height,
			alt: shareButtonElements.alt,
		};

		const mockupAuthorImageData = {
			width: 40,
			height: 40,
			alt: 'Michelle Appleton',
		};

		expect(authorImageData, 'to satisfy', mockupAuthorImageData);
	});

	it("should have a 'Share' text", () => {
		const shareTextEl = document.querySelector('.card__share-action-txt');
		const isShareTextExist =
			shareTextEl.textContent.indexOf('Share') !== -1;

		expect(isShareTextExist, 'to equal', true);
	});

	it('should have three share button elements', () => {
		const shareButtonElements = document.querySelectorAll(
			'.card__share-action-buttons li'
		);

		expect(shareButtonElements.length, 'to equal', 3);
	});
});
