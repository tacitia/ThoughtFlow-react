export const SET_COLLECTION_ID = 'SET_COLLECTION_ID';
export const SET_USER_ID = 'SET_USER_ID';

export function setCollectionId(collectionId) {
  return {
    type: SET_COLLECTION_ID,
    payload: {
      collectionId,
    }
  };
}

export function setUserId(userId) {
  return {
    type: SET_USER_ID,
    payload: {
      userId,
    }
  };
}

