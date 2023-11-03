import { RenderResult, act} from "@testing-library/react"
import { render } from "../../test-utils"
import axios from "axios";
import { mockState, renderWithState } from "../../lib/testHelpers";
import jsonTrip from '../../data/single trip.json';
import { TripDetails } from "./tripDetails.component";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Trip Details", ()=> {

  beforeAll(() =>{
    mockedAxios.create.mockReturnThis();
  })

  it("Shows empty if backend returns no data", async () =>{
    mockedAxios.get.mockResolvedValueOnce({data: undefined});

    let container : RenderResult;
    await act(async() =>{
      container = await render(renderWithState(<TripDetails />, mockState));
    });
    expect(() => container!.getByTestId('details-container')).toThrow();

  });

  it("Shows empty if backend errors", async () =>{
    mockedAxios.get.mockRejectedValueOnce({ok: false});

    let container : RenderResult;
    await act(async() =>{
      container = await render(renderWithState(<TripDetails />, mockState));
    });
    expect(() => container!.getByTestId('details-container')).toThrow();
  });
    
  it("Shows details if backend returns data", async () =>{
    mockedAxios.get.mockResolvedValueOnce({data: jsonTrip});

    await act(async() =>{
      await render(renderWithState(<TripDetails />, mockState));
    });
    expect(mockState.setSelectedTrip).toHaveBeenCalled()
    
  });

});
