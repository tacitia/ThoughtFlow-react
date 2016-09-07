import { createSelector } from 'reselect';

const getUserReference = (state) => state.referenceReducer.reference;
const getAssociationMap = (state) => state.referenceReducer.associationMap;

const getReferenceIdMap = createSelector(
  [ getUserReference ], 
  (references) => {
    if (!references) return {};
    const idMap = {};
    references.forEach(ref => idMap[ref.id] = ref);
    return idMap;
  }
);

export const getArticleCitationMap = createSelector(
  [ getReferenceIdMap, getAssociationMap ], 
  (referenceIdMap, associationMap) => {
    if (_.isEmpty(referenceIdMap) || !associationMap) return {};
    else {
      const articleCitationMap = {};
      const allTextEvidenceAssociations = _.filter(associationMap, entry => entry.sourceType === 'evidence' && entry.targetType === 'text');
      allTextEvidenceAssociations.forEach(entry => {
        const textId = entry.targetId.toString().split('-');
        if (textId.length === 2) {
          const articleId = textId[0];
          if (!articleCitationMap[articleId]) {
            articleCitationMap[articleId] = [];
          }
          articleCitationMap[articleId].push(referenceIdMap[entry.sourceId]);
        }
      });
      return articleCitationMap;
    }
  }
);