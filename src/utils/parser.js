import {uniqueId} from 'lodash';

const xmlParser = (source) => {
  const xml = new DOMParser().parseFromString(source, 'application/xml');

  const parseError = xml.querySelector('parsererror');
  if (parseError) {
    const textError = parseError.textContent;
    throw new Error(textError);
  }

  const feedId = uniqueId();

  const feed = {
    title: xml.querySelector('channel > title').textContent,
    description: xml.querySelector('channel > description').textContent,
    id: feedId,
  };

  const nodeList = xml.querySelectorAll('channel > item');
  const posts = [...nodeList].map((node) => {
    return {
      feedId,
      id: uniqueId(),
      title: node.querySelector('title').textContent,
      link: node.querySelector('link').textContent,
      description: node.querySelector('description').textContent,
    };
  });

  return {feed, posts};
};

export {xmlParser};