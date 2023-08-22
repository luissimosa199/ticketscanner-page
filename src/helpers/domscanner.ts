import { IData } from "@/interfaces";

type TicketItem = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

function parseNumberString(numberString: string): number {
  const cleanedString = numberString.replace(/[^0-9,-]+/g, "");
  const parsedNumber = parseFloat(
    cleanedString.replace(",", ".").replace(/,/g, "")
  );
  return parsedNumber || 0;
}

export function parseDiscoTicket(htmlString: string): IData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const element = doc.querySelector(".table-full");
  const articles = element?.querySelectorAll(".table-full-alt") || [];

  const ticketItems: TicketItem[] = Array.from(articles).map((e) => {
    const name =
      e.querySelector("td>div:nth-child(1)")?.textContent?.trim() || "";

    const quantity = parseFloat(
      (
        e
          .querySelector("td:nth-child(2)>div:nth-child(1)")
          ?.textContent?.trim() || ""
      ).replace(/,/g, ".")
    );

    const price = parseFloat(
      (
        e
          .querySelector("td:nth-child(3)>div:nth-child(1)")
          ?.textContent?.trim() || ""
      )
        .replace(/[^0-9.,]+/g, "")
        .replace(".", "")
        .replace(",", ".")
    );

    const total = parseFloat(
      (
        e
          .querySelector("td:nth-child(4)>div:nth-child(1)")
          ?.textContent?.trim() || ""
      )
        .replace(/[^0-9.,]+/g, "")
        .replace(".", "")
        .replace(",", ".")
    );

    return { name, quantity, price, total };
  });

  const totalAmountElements = doc.querySelectorAll(
    ".total-import.right.bold > div"
  );

  console.log(totalAmountElements);
  const totalAmountString = totalAmountElements[1]?.textContent?.trim() || "";
  const totalAmount = parseNumberString(totalAmountString);

  const logoLink = doc.querySelector("img")?.src || "";

  const addressElement = doc.querySelector(".company-header:nth-child(3)");
  const address =
    addressElement?.textContent?.trim().replace("Dom.Com. ", "") || "";

  const emisionElement = Array.from(doc.querySelectorAll("div")).find(
    (element) => element.textContent?.includes("Emisión:")
  );
  const emisionText = emisionElement?.textContent?.trim() || null;

  const date = emisionText ? emisionText.split(":")[1].trim() : "";

  return {
    ticketItems,
    totalAmount,
    logoLink,
    address,
    date,
  };
}
