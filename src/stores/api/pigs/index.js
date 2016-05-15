export function fetchPigsFromApi() {
  return fetch('http://private-8b65e-nicolas23.apiary-mock.com/sows')
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
  return fetch('http://private-8b65e-nicolas23.apiary-mock.com/sows', {
    method: 'POST',
    body: parseToJson(sow),
  })
  .then((result) => {
    return result.json()
  })
  .then((json) => {
    return {
      data: parsePig(json),
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
    date: json.date,
    birthDate: json.birth_date,
    origin: json.origin,
    purchasedPrice: json.purchased_price,
    mountingDates: json.mounting_dates,
    farrowings: json.farrowings,
  }
}

export function parseToJson(pig) {
  return {
    id: pig.id,
    tag_number: pig.tagNumber,
    date: pig.date,
    birth_date: pig.birthDate,
    origin: pig.origin,
    purchased_price: pig.purchasedPrice,
    mounting_dates: pig.mountingDates,
    farrowings: pig.farrowings,
  }
}
