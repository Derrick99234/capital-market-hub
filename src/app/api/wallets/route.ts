import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import DepositWallet from "@/models/DepositWallet";
import { uploadFileToR2, deleteFileFromR2 } from "@/lib/r2";

const DEFAULT_WALLETS = [
  {
    name: "btc",
    label: "BTC (Bitcoin Network)",
    symbol: "BTC",
    network: "Bitcoin",
    walletAddress: "bc1qw2ysdld5l0l82mu6euzlekhvlv5qhw9j6r85fm",
    qrCodeUrl: "/images/btc-acct.jpg",
    isActive: true,
    order: 1,
  },
  {
    name: "usdt-eth",
    label: "USDT (Ethereum / ERC20)",
    symbol: "USDT",
    network: "ERC20",
    walletAddress: "0x4477CD5bDB3165CB3BfE44aE6F1d1a40eCD9cCC8",
    qrCodeUrl: "/images/usdt_eth-acct.jpg",
    isActive: true,
    order: 2,
  },
  {
    name: "usdt-trc",
    label: "USDT (TRC20)",
    symbol: "USDT",
    network: "TRC20",
    walletAddress: "TXKo3hggzadyNq4vhpMbq4DfmCFQPMKMo8",
    qrCodeUrl: "/images/usdt_trc-acct.jpg",
    isActive: true,
    order: 3,
  },
  {
    name: "eth",
    label: "ETH (Ethereum Network)",
    symbol: "ETH",
    network: "Ethereum",
    walletAddress: "0x4477CD5bDB3165CB3BfE44aE6F1d1a40eCD9cCC8",
    qrCodeUrl: "/images/eth-acct.jpg",
    isActive: true,
    order: 4,
  },
];

// GET all deposit wallets (seeds defaults if empty)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";

    const filter: any = {};
    if (activeOnly) {
      filter.isActive = true;
    }

    let wallets = await DepositWallet.find(filter).sort({ order: 1, createdAt: 1 }).lean();

    if (wallets.length === 0 && !activeOnly) {
      // Seed default wallets if empty
      await DepositWallet.insertMany(DEFAULT_WALLETS);
      wallets = await DepositWallet.find(filter).sort({ order: 1, createdAt: 1 }).lean();
    } else if (wallets.length === 0 && activeOnly) {
      const allCount = await DepositWallet.countDocuments();
      if (allCount === 0) {
        await DepositWallet.insertMany(DEFAULT_WALLETS);
        wallets = await DepositWallet.find(filter).sort({ order: 1, createdAt: 1 }).lean();
      }
    }

    return NextResponse.json({ wallets }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch wallets error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch deposit wallets" },
      { status: 500 }
    );
  }
}

// POST: Add a new deposit wallet
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let label = "";
    let symbol = "";
    let network = "";
    let walletAddress = "";
    let qrCodeUrl = "";
    let isActive = true;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      label = (formData.get("label") as string) || "";
      symbol = (formData.get("symbol") as string) || "";
      network = (formData.get("network") as string) || "";
      walletAddress = (formData.get("walletAddress") as string) || "";
      const isActiveVal = formData.get("isActive");
      isActive = isActiveVal !== "false" && isActiveVal !== null;

      const file = formData.get("qrCodeFile") as File | null;
      if (file && file.size > 0) {
        qrCodeUrl = await uploadFileToR2(file, "wallets/qr-codes");
      } else {
        qrCodeUrl = (formData.get("qrCodeUrl") as string) || "";
      }
    } else {
      const body = await req.json();
      label = body.label || "";
      symbol = body.symbol || "";
      network = body.network || "";
      walletAddress = body.walletAddress || "";
      qrCodeUrl = body.qrCodeUrl || "";
      isActive = body.isActive !== false;
    }

    if (!label || !walletAddress || !symbol) {
      return NextResponse.json(
        { error: "Name/Label, Symbol, and Wallet Address are required" },
        { status: 400 }
      );
    }

    if (!qrCodeUrl) {
      return NextResponse.json(
        { error: "Please upload a QR code image or provide a QR code image URL" },
        { status: 400 }
      );
    }

    const identifierName = (
      network ? `${symbol}-${network}` : symbol
    ).toLowerCase().replace(/[^a-z0-9]/g, "-");

    const newWallet = new DepositWallet({
      name: identifierName,
      label: label.trim(),
      symbol: symbol.trim().toUpperCase(),
      network: network ? network.trim() : symbol.trim(),
      walletAddress: walletAddress.trim(),
      qrCodeUrl: qrCodeUrl.trim(),
      isActive,
    });

    await newWallet.save();

    return NextResponse.json(
      { message: "Deposit wallet created successfully", wallet: newWallet },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create wallet error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create deposit wallet" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing deposit wallet
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let id = "";
    let label: string | undefined;
    let symbol: string | undefined;
    let network: string | undefined;
    let walletAddress: string | undefined;
    let qrCodeUrl: string | undefined;
    let isActive: boolean | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      id = (formData.get("id") as string) || "";
      label = formData.get("label") ? (formData.get("label") as string) : undefined;
      symbol = formData.get("symbol") ? (formData.get("symbol") as string) : undefined;
      network = formData.get("network") ? (formData.get("network") as string) : undefined;
      walletAddress = formData.get("walletAddress") ? (formData.get("walletAddress") as string) : undefined;

      const activeVal = formData.get("isActive");
      if (activeVal !== null && activeVal !== undefined) {
        isActive = activeVal === "true";
      }

      const file = formData.get("qrCodeFile") as File | null;
      if (file && file.size > 0) {
        qrCodeUrl = await uploadFileToR2(file, "wallets/qr-codes");
      } else if (formData.get("qrCodeUrl")) {
        qrCodeUrl = formData.get("qrCodeUrl") as string;
      }
    } else {
      const body = await req.json();
      id = body.id || body._id;
      label = body.label;
      symbol = body.symbol;
      network = body.network;
      walletAddress = body.walletAddress;
      qrCodeUrl = body.qrCodeUrl;
      isActive = body.isActive;
    }

    if (!id) {
      return NextResponse.json({ error: "Wallet ID is required" }, { status: 400 });
    }

    const wallet = await DepositWallet.findById(id);
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // If updating QR image and old image was on R2, delete old image
    if (qrCodeUrl && qrCodeUrl !== wallet.qrCodeUrl && wallet.qrCodeUrl.startsWith("http")) {
      await deleteFileFromR2(wallet.qrCodeUrl);
      wallet.qrCodeUrl = qrCodeUrl;
    }

    if (label !== undefined) wallet.label = label.trim();
    if (symbol !== undefined) wallet.symbol = symbol.trim().toUpperCase();
    if (network !== undefined) wallet.network = network.trim();
    if (walletAddress !== undefined) wallet.walletAddress = walletAddress.trim();
    if (isActive !== undefined) wallet.isActive = isActive;

    await wallet.save();

    return NextResponse.json(
      { message: "Deposit wallet updated successfully", wallet },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update wallet error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update deposit wallet" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a deposit wallet
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body.id || body._id;
      } catch {
        // No body
      }
    }

    if (!id) {
      return NextResponse.json({ error: "Wallet ID is required" }, { status: 400 });
    }

    const wallet = await DepositWallet.findById(id);
    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // Delete image from R2 if hosted there
    if (wallet.qrCodeUrl && wallet.qrCodeUrl.startsWith("http")) {
      await deleteFileFromR2(wallet.qrCodeUrl);
    }

    await DepositWallet.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Deposit wallet deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete wallet error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete deposit wallet" },
      { status: 500 }
    );
  }
}
