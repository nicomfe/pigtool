export function fetchPigsFromApi() {
  return fetch('http://localhost:3001/api/sows')
    .then((result) => {
      return result.json()
    })
    .then((json) => {
      return {
        data: parse(json),
      }
    })
    .catch((e) => {
      return {
        error: e,
      }
    })
}

export function postSow(sow) {
  return fetch('http://localhost:3001/api/sows', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: parseToJson(sow),
  })
  .then((result) => {
    return result.json()
  })
  .then((json) => {
    return {
      data: parsePig(json.sow),
    }
  })
  .catch((e) => {
    return {
      error: e,
    }
  })
}


export function parse(json) {
  if (!json) {
    return []
  }
  return json.map(parsePig)
}

export function parsePig(json) {
  return {
    id: json.id,
    tagNumber: json.tag_number,
    boughtDate: json.bought_date,
    birthDate: json.birth_date,
    purchasedPrice: json.purchased_price,
    fatherTag: json.father_tag,
    motherTag: json.mother_tag,
  }
}

export function parseToJson(pig) {
  return JSON.stringify({
    tag_number: pig.tagNumber,
    bought_date: pig.boughtDate,
    birth_date: pig.birthDate,
    purchased_price: pig.purchasedPrice,
    father_tag: pig.fatherTag,
    mother_tag: pig.motherTag,
  })
}
